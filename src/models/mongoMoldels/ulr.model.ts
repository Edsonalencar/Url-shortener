import { prop, getModelForClass } from '@typegoose/typegoose';

class ModelURL {
  @prop({ required: true })
  public originURL?: string;

  @prop({ required: true })
  public hash?: string;

  @prop({ required: true })
  public shortURL?: string;
}

export const MongoModelURL = getModelForClass(ModelURL);
