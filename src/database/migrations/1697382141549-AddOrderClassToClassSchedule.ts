import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class AddOrderClassToClassSchedule1597382141549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('class_schedule',
      new TableColumn({
        name: 'class_id',
        type: 'uuid',
        isNullable: true,
      }));

    await queryRunner.createForeignKey(
      'class_schedule',
      new TableForeignKey({
        name: 'ClassScheduleClass',
        columnNames: ['class_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'classes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('class_schedule', 'ClassScheduleClass');
    await queryRunner.dropColumn('class_schedule', 'class_id');
  }
}
