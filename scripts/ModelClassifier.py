from torch.nn import functional as F
from torch import nn
from pytorch_lightning.core.lightning import LightningModule
from torch.optim import SGD, Adam
import torchvision.models as models

class ModelClassifier(LightningModule):
    def __init__(self, num_classes, model,
                optimizer='adam', lr=1e-3, momentum=0,
                transfer=True, tune_fc_only=True):
        super().__init__()

        self.__dict__.update(locals())
        torch_models = {
            'densenet': models.densenet161, 'resnet34': models.resnet34,
            'resnet50': models.resnet50, 'resnet101': models.resnet101,
            'resnet152': models.resnet152, 'googlenet': models.googlenet,
        }
        self.optimizer = optimizer
        self.lr = lr
        self.momentum = momentum
        self.num_classes = num_classes
        #instantiate loss criterion
        self.criterion = nn.BCEWithLogitsLoss() if num_classes == 2 else nn.CrossEntropyLoss()
        # Using a pretrained ResNet backbone
        self.model = torch_models[model](pretrained=transfer)
        # Replace old FC layer with Identity so we can train our own
        linear_size = list(self.model.children())[-1].in_features
        # replace final layer for fine tuning
        self.model.conv1 = nn.Conv2d(1, 64, kernel_size=7, stride=2, padding=3,
                               bias=False)
                               
        self.model.fc = nn.Linear(linear_size, num_classes)
        if tune_fc_only: # option to only tune the fully-connected layers
            for child in list(self.model.children())[:-1]:
                for param in child.parameters():
                    param.requires_grad = False

    def forward(self, X):
        return self.model(X)

    def configure_optimizers(self):
        if self.optimizer=='adam':
            return Adam(self.parameters(), lr=self.lr)
        if self.optimizer=='sgd':
            return SGD(self.parameters(), lr=self.lr, momentum=self.momentum)
        
    def training_step(self, batch, batch_idx):
        x, y = batch
        preds = self(x)
        if self.num_classes == 2:
            y = F.one_hot(y, num_classes=2).float()
        loss = self.criterion(preds, y)

        # perform logging
        self.log("train_loss", loss, on_step=True, on_epoch=True, prog_bar=True, logger=True)
        return loss
    
    def validation_step(self, batch, batch_idx):
        x, y = batch
        preds = self(x)
        if self.num_classes == 2:
            y = F.one_hot(y, num_classes=2).float()
        
        loss = self.criterion(preds, y)
        # perform logging
        self.log("val_loss", loss, on_epoch=True, prog_bar=True, logger=True)

    def test_step(self, batch, batch_idx):
        x, y = batch
        preds = self(x)
        if self.num_classes == 2:
            y = F.one_hot(y, num_classes=2).float()
        
        loss = self.criterion(preds, y)
        # perform logging
        self.log("test_loss", loss, on_step=True, prog_bar=True, logger=True)
