import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Student } from './Student';
import { ClassCard } from './ClassCard';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ nullable: true })
    orderId: string;

    @Column({ 
        type: 'enum',
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'PENDING'
    })
    status: 'PENDING' | 'COMPLETED' | 'FAILED';



    @ManyToOne(() => ClassCard, classCard => classCard.payments, {
        nullable: false
    })
    classCard: ClassCard;
}
