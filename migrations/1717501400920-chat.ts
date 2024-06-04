import { MigrationInterface, QueryRunner } from "typeorm";

export class Chat1717501400920 implements MigrationInterface {
    name = 'Chat1717501400920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`api\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`method\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_id\` int NOT NULL, \`api_id\` int NOT NULL, UNIQUE INDEX \`ui_api_id_role_id\` (\`role_id\`, \`api_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`task_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`project_id\` int NOT NULL, \`user_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`is_finished\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`should_end\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`project_id\` int NOT NULL, \`task_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`afford\` (\`id\` int NOT NULL AUTO_INCREMENT, \`point\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`piority\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sprint\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`start_at\` datetime NOT NULL, \`end_at\` datetime NOT NULL, \`status_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`retro\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`task_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`priority_id\` int NOT NULL, \`status_id\` int NOT NULL, \`sprint_id\` int NOT NULL, \`afford_id\` int NOT NULL, \`department_id\` int NOT NULL, \`is_finished\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`finish_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`branch_sub\` (\`id\` int NOT NULL AUTO_INCREMENT, \`head_branch_id\` int NOT NULL, \`sub_branch_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`message_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0e84b3154cd312804805a97901\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`reciever_id\` int NULL, \`sender_id\` int NOT NULL, \`branch_id\` int NULL, \`message\` varchar(255) NOT NULL, \`type_id\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`branch\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`branch_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`branch_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`role_id\` int NULL, \`department_id\` int NULL, \`last_name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`fk_p_api_id\` FOREIGN KEY (\`api_id\`) REFERENCES \`api\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`fk_p_role_id\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_users\` ADD CONSTRAINT \`fk_tu_task_id\` FOREIGN KEY (\`task_id\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_users\` ADD CONSTRAINT \`fk_tu_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_users\` ADD CONSTRAINT \`fk_pu_project_id\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_users\` ADD CONSTRAINT \`fk_pu_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_tasks\` ADD CONSTRAINT \`fk_pt_project_id\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_tasks\` ADD CONSTRAINT \`fk_pt_task_id\` FOREIGN KEY (\`task_id\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sprint\` ADD CONSTRAINT \`fk_s_status\` FOREIGN KEY (\`status_id\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`retro\` ADD CONSTRAINT \`fk_r_task_id\` FOREIGN KEY (\`task_id\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`fk_t_department_id\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`fk_t_afford\` FOREIGN KEY (\`afford_id\`) REFERENCES \`afford\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`fk_t_priority\` FOREIGN KEY (\`priority_id\`) REFERENCES \`piority\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`fk_t_sprint\` FOREIGN KEY (\`sprint_id\`) REFERENCES \`sprint\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`fk_t_status\` FOREIGN KEY (\`status_id\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`branch_sub\` ADD CONSTRAINT \`fk_bs_head_branch_id\` FOREIGN KEY (\`head_branch_id\`) REFERENCES \`branch\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`branch_sub\` ADD CONSTRAINT \`fk_bs_sub_branch_id\` FOREIGN KEY (\`sub_branch_id\`) REFERENCES \`branch\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`fk_m_reciever_id\` FOREIGN KEY (\`reciever_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`fk_m_sender_id\` FOREIGN KEY (\`sender_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`fk_m_branch_id\` FOREIGN KEY (\`branch_id\`) REFERENCES \`branch\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`fk_mt_type_id\` FOREIGN KEY (\`type_id\`) REFERENCES \`message_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`branch_users\` ADD CONSTRAINT \`fk_bu_branch_id\` FOREIGN KEY (\`branch_id\`) REFERENCES \`branch\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`branch_users\` ADD CONSTRAINT \`fk_bu_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`fk_u_role_id\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`fk_u_department_id\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`fk_u_department_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`fk_u_role_id\``);
        await queryRunner.query(`ALTER TABLE \`branch_users\` DROP FOREIGN KEY \`fk_bu_user_id\``);
        await queryRunner.query(`ALTER TABLE \`branch_users\` DROP FOREIGN KEY \`fk_bu_branch_id\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`fk_mt_type_id\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`fk_m_branch_id\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`fk_m_sender_id\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`fk_m_reciever_id\``);
        await queryRunner.query(`ALTER TABLE \`branch_sub\` DROP FOREIGN KEY \`fk_bs_sub_branch_id\``);
        await queryRunner.query(`ALTER TABLE \`branch_sub\` DROP FOREIGN KEY \`fk_bs_head_branch_id\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`fk_t_status\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`fk_t_sprint\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`fk_t_priority\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`fk_t_afford\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`fk_t_department_id\``);
        await queryRunner.query(`ALTER TABLE \`retro\` DROP FOREIGN KEY \`fk_r_task_id\``);
        await queryRunner.query(`ALTER TABLE \`sprint\` DROP FOREIGN KEY \`fk_s_status\``);
        await queryRunner.query(`ALTER TABLE \`project_tasks\` DROP FOREIGN KEY \`fk_pt_task_id\``);
        await queryRunner.query(`ALTER TABLE \`project_tasks\` DROP FOREIGN KEY \`fk_pt_project_id\``);
        await queryRunner.query(`ALTER TABLE \`project_users\` DROP FOREIGN KEY \`fk_pu_user_id\``);
        await queryRunner.query(`ALTER TABLE \`project_users\` DROP FOREIGN KEY \`fk_pu_project_id\``);
        await queryRunner.query(`ALTER TABLE \`task_users\` DROP FOREIGN KEY \`fk_tu_user_id\``);
        await queryRunner.query(`ALTER TABLE \`task_users\` DROP FOREIGN KEY \`fk_tu_task_id\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`fk_p_role_id\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`fk_p_api_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`branch_users\``);
        await queryRunner.query(`DROP TABLE \`branch\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e84b3154cd312804805a97901\` ON \`message_types\``);
        await queryRunner.query(`DROP TABLE \`message_types\``);
        await queryRunner.query(`DROP TABLE \`branch_sub\``);
        await queryRunner.query(`DROP TABLE \`department\``);
        await queryRunner.query(`DROP TABLE \`task\``);
        await queryRunner.query(`DROP TABLE \`retro\``);
        await queryRunner.query(`DROP TABLE \`sprint\``);
        await queryRunner.query(`DROP TABLE \`status\``);
        await queryRunner.query(`DROP TABLE \`piority\``);
        await queryRunner.query(`DROP TABLE \`afford\``);
        await queryRunner.query(`DROP TABLE \`project_tasks\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`project_users\``);
        await queryRunner.query(`DROP TABLE \`task_users\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP INDEX \`ui_api_id_role_id\` ON \`permission\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
        await queryRunner.query(`DROP TABLE \`api\``);
    }

}
