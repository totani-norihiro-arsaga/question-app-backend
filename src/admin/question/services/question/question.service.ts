import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateQuestionDto } from 'src/questions/dto/create-qustion.dto';
import { Choice } from 'src/questions/entities/choice.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Choice) private choiceRepository: Repository<Choice>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto, manager: EntityManager) {
    let question = await manager.getRepository(Question).save({
      questionText: createQuestionDto.qustion_text,
      responseFormat: createQuestionDto.response_format,
      surveyId: createQuestionDto.survey_id,
    });

    const choices = createQuestionDto.choices.map((createChoiceDto)=>{
      return {
        choiceText: createChoiceDto.choice_text,
        questionId: question.id,
      }
    })

    const a = await manager.getRepository(Choice).save(choices);
    console.log(a);
    return a;
  }
}
