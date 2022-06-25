import { registerAs } from "@nestjs/config";

export default registerAs('solr', () => ({
    url: process.env.SOLR_URL,
    core: process.env.SOLR_CORE
  }));
