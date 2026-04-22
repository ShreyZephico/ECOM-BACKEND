import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260420190210 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "product_size" ("id" text not null, "product_id" text not null, "size_id" text not null, "status" text not null default 'active', "stock" integer not null default 0, "price_adjustment" integer not null default 0, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_size_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_size_deleted_at" ON "product_size" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "product_size" cascade;`);
  }

}

