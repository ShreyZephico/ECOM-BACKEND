import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260421125517 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "custo_product_variants" add column if not exists "medusa_variant_id" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "custo_product_variants" drop column if exists "medusa_variant_id";`);
  }

}
