import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ unique: true })
  phone_number!: string;
}
