import { MigrationInterface, QueryRunner } from "typeorm";

export class BIAddedQueryEntity1740239107777 implements MigrationInterface {
    name = 'BIAddedQueryEntity1740239107777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "queries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "quantity" integer NOT NULL, "purpose_of_query" character varying NOT NULL, "message" character varying NOT NULL, "deleted_at" TIMESTAMP, "updated_at" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e212c03c614452a1d1f8699d2ae" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "queries"`);
    }

}
