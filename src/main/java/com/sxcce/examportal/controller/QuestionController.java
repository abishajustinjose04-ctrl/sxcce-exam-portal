
package com.sxcce.examportal.controller;

import com.sxcce.examportal.model.Question;
import com.sxcce.examportal.repository.QuestionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class QuestionController {

    private final QuestionRepository questionRepository;

    public QuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @GetMapping("/exams/{examId}/questions")
    public List<Map<String, Object>> getStudentQuestions(
            @PathVariable Long examId) {

        return questionRepository.findByExamId(examId)
                .stream()
                .map(q -> Map.<String, Object>of(
                        "id", q.getId(),
                        "examId", q.getExamId(),
                        "questionText", q.getQuestionText() == null ? "" : q.getQuestionText(),
                        "optionA", q.getOptionA() == null ? "" : q.getOptionA(),
                        "optionB", q.getOptionB() == null ? "" : q.getOptionB(),
                        "optionC", q.getOptionC() == null ? "" : q.getOptionC(),
                        "optionD", q.getOptionD() == null ? "" : q.getOptionD()
                ))
                .toList();
    }

    @GetMapping("/admin/exams/{examId}/questions")
    public List<Question> getAdminQuestions(@PathVariable Long examId) {
        return questionRepository.findByExamId(examId);
    }

    @PostMapping("/questions")
    public Question addQuestion(@RequestBody Question question) {
        return questionRepository.save(question);
    }

    @DeleteMapping("/questions/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        questionRepository.deleteById(id);
    }
}
