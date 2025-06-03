import { MigrationInterface, QueryRunner } from "typeorm";

export class BIMi1748958673502 implements MigrationInterface {
    name = 'BIMi1748958673502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "customer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'CUSTOMER'`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "status" character varying NOT NULL DEFAULT 'SCHEDULED'`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "cost" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_8195a399cc01bb0374aef4a88e" ON "services" ("customer_id") `);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_8195a399cc01bb0374aef4a88e9" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_8195a399cc01bb0374aef4a88e9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8195a399cc01bb0374aef4a88e"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "cost" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "customer_id"`);
    }

}
