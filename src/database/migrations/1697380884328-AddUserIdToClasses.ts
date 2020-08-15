import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class AddUserIdToClasses1597380884328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('classes',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }));

    await queryRunner.createForeignKey(
      'classes',
      new TableForeignKey({
        name: 'ClassesUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('classes', 'ClassesUser');
    await queryRunner.dropColumn('classes', 'user_id');
  }
}
