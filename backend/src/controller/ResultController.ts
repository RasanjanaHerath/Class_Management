import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source'; // Adjust the import path as necessary
import { Result } from '../entity/Result';
import { Assignment } from '../entity/Assignment';

export class ResultController {
  static getAllResults = async (req: Request, res: Response, next: NextFunction) => {
    const resultRepository = AppDataSource.getRepository(Result);
    try {
      const results = await resultRepository.find({ relations: ['assignment'] });
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching results', error });
    }
  };

  static getResultById = async (req: Request, res: Response, next: NextFunction) => {
    const resultRepository = AppDataSource.getRepository(Result);
    try {
      const id = parseInt(req.params.id);
      const result = await resultRepository.findOne({ where: { id }, relations: ['assignment'] });
      if (!result) {
        return res.status(404).json({ message: 'Result not found' });
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching result', error });
    }
  };

  static createResult = async (req: Request, res: Response, next: NextFunction) => {
    const resultRepository = AppDataSource.getRepository(Result);
    const assignmentRepository = AppDataSource.getRepository(Assignment);
    const { result, feedback, assignmentId } = req.body;
    try {
      const assignment = await assignmentRepository.findOne({ where: { id: assignmentId } });
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      const newResult = resultRepository.create({ result, assignment });
      await resultRepository.save(newResult);
      return res.status(201).json(newResult);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating result', error });
    }
  };

  static updateResult = async (req: Request, res: Response, next: NextFunction) => {
    const resultRepository = AppDataSource.getRepository(Result);
    const assignmentRepository = AppDataSource.getRepository(Assignment);
    const { id } = req.params;
    const { result, feedback, assignmentId } = req.body;
    try {
      const existingResult = await resultRepository.findOne({ where: { id: parseInt(id) } });
      if (!existingResult) {
        return res.status(404).json({ message: 'Result not found' });
      }
      const assignment = await assignmentRepository.findOne({ where: { id: assignmentId } });
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      existingResult.result = result;
      existingResult.assignment = assignment;
      await resultRepository.save(existingResult);
      return res.status(200).json(existingResult);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating result', error });
    }
  };

  static deleteResult = async (req: Request, res: Response, next: NextFunction) => {
    const resultRepository = AppDataSource.getRepository(Result);
    const { id } = req.params;
    try {
      const result = await resultRepository.findOne({ where: { id: parseInt(id) } });
      if (!result) {
        return res.status(404).json({ message: 'Result not found' });
      }
      await resultRepository.remove(result);
      return res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting result', error });
    }
  };
}