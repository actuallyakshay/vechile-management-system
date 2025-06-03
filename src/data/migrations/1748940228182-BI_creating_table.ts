import { MigrationInterface, QueryRunner } from 'typeorm';

export class BICreatingTable1748940228182 implements MigrationInterface {
   name = 'BICreatingTable1748940228182';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
      );
      await queryRunner.query(
         `CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" integer NOT NULL, "scheduled_date" character varying NOT NULL, "cost" integer NOT NULL, "duration_in_min" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "vehicle_id" uuid, "mechanic_id" uuid, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`
      );
      await queryRunner.query(`CREATE INDEX "IDX_fc9f5579e6b3ad54f3c4def38a" ON "services" ("vehicle_id") `);
      await queryRunner.query(`CREATE INDEX "IDX_589cf8f749aed6c7512b6a28a7" ON "services" ("mechanic_id") `);
      await queryRunner.query(
         `CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "VIN" character varying NOT NULL, "make" character varying NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "owner_id" uuid, CONSTRAINT "UQ_fa442e297bd08110028e6ab4bff" UNIQUE ("VIN"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`
      );
      await queryRunner.query(`CREATE INDEX "IDX_490a6fd6eb12a0a64e87b534dd" ON "vehicles" ("owner_id") `);
      await queryRunner.query(
         `ALTER TABLE "services" ADD CONSTRAINT "FK_fc9f5579e6b3ad54f3c4def38a1" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
      );
      await queryRunner.query(
         `ALTER TABLE "services" ADD CONSTRAINT "FK_589cf8f749aed6c7512b6a28a76" FOREIGN KEY ("mechanic_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
      );
      await queryRunner.query(
         `ALTER TABLE "vehicles" ADD CONSTRAINT "FK_490a6fd6eb12a0a64e87b534dd9" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_490a6fd6eb12a0a64e87b534dd9"`);
      await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_589cf8f749aed6c7512b6a28a76"`);
      await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_fc9f5579e6b3ad54f3c4def38a1"`);
      await queryRunner.query(`DROP INDEX "public"."IDX_490a6fd6eb12a0a64e87b534dd"`);
      await queryRunner.query(`DROP TABLE "vehicles"`);
      await queryRunner.query(`DROP INDEX "public"."IDX_589cf8f749aed6c7512b6a28a7"`);
      await queryRunner.query(`DROP INDEX "public"."IDX_fc9f5579e6b3ad54f3c4def38a"`);
      await queryRunner.query(`DROP TABLE "services"`);
      await queryRunner.query(`DROP TABLE "users"`);
   }
}
