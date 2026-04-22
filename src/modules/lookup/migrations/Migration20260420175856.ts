import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260420175856 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "diamonds" ("id" text not null, "quality" text not null, "karets" integer not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "diamonds_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_diamonds_deleted_at" ON "diamonds" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "metals" ("id" text not null, "title" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "metals_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_metals_deleted_at" ON "metals" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "size" ("id" text not null, "size" real not null, "mm" real not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "size_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_size_deleted_at" ON "size" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "diamonds" cascade;`);

    this.addSql(`drop table if exists "metals" cascade;`);

    this.addSql(`drop table if exists "size" cascade;`);
  }

}
