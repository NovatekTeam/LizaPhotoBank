import os
from pytorch_lightning import LightningDataModule
from sklearn.utils import shuffle
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader, random_split

class DataModule(LightningDataModule):
    def __init__(
        self, 
        batch_size, 
        data_dir: str = os.path.join('..','datasets'),
        num_workers=4, 
    ):
        super().__init__()
        self.data_dir = data_dir
        self.batch_size = batch_size
        self.num_workers = num_workers
        transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Grayscale(num_output_channels=1),
            transforms.Resize((800,800)),
            # transforms.AutoAugument(transforms.AutoAugmentPolicy.SVHN),
            transforms.Normalize(0.5,0.5)
        ])
        self.dataset = torchvision.datasets.ImageFolder(root=self.data_dir, transform = transform)

    def setup(self, stage = None):
        # Assign train/val datasets for use in dataloaders
        n_val = int(len(self.dataset) * 0.3)
        n_train = len(self.dataset) - n_val
        self.train, self.val = random_split(self.dataset, [n_train, n_val])


    def train_dataloader(self):
        return DataLoader(self.train, batch_size=self.batch_size, num_workers=self.num_workers, shuffle=True)

    def val_dataloader(self):
        return DataLoader(self.val, batch_size=self.batch_size, num_workers=self.num_workers)

    def test_dataloader(self):
        return DataLoader(self.val, batch_size=self.batch_size, num_workers=self.num_workers)