import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260421080700 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "custo_product_variants" ("id" text not null, "product_id" text not null, "size_id" text not null, "metal_id" text not null, "diamond_id" text not null, "price" integer not null, "stock" integer not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "custo_product_variants_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_custo_product_variants_deleted_at" ON "custo_product_variants" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`drop table if exists "product_veriant" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table if not exists "product_veriant" ("id" text not null, "product_id" text not null, "size_id" text not null, "metal_id" text not null, "diamond_id" text not null, "price" integer not null, "stock" integer not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_veriant_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_veriant_deleted_at" ON "product_veriant" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`drop table if exists "custo_product_variants" cascade;`);
  }

}
