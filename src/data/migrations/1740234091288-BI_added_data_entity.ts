import { MigrationInterface, QueryRunner } from 'typeorm';

export class BIAddedDataEntity1740234091288 implements MigrationInterface {
   name = 'BIAddedDataEntity1740234091288';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `CREATE TABLE "data_entities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "section_name" character varying NOT NULL, "data" jsonb NOT NULL, "deleted_at" TIMESTAMP, "updated_at" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e07f5a332fd5b9e09f77d72ad24" PRIMARY KEY ("id"))`
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE "data_entities"`);
   }
}
