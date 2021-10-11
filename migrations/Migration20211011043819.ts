import { Migration } from '@mikro-orm/migrations';

export class Migration20211011043819 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "serial_number" varchar(255) not null, "inventory" int4 not null, "price" int4 not null, "image_url" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "product" add constraint "product_serial_number_unique" unique ("serial_number");');

    this.addSql('create table "review" ("id" serial primary key, "product_id" int4 not null, "rating" int4 not null, "text" varchar(255) not null);');

    this.addSql('alter table "review" add constraint "review_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
  }

}
