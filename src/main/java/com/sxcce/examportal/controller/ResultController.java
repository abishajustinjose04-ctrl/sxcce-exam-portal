
package com.sxcce.examportal.controller;

import com.sxcce.examportal.model.Question;
import com.sxcce.examportal.model.Result;
import com.sxcce.examportal.repository.QuestionRepository;
import com.sxcce.examportal.repository.ResultRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultRepository resultRepository;
    private final QuestionRepository questionRepository;

    public ResultController(
            ResultRepository resultRepository,
            QuestionRepository questionRepository) {
        this.resultRepository = resultRepository;
        this.questionRepository = questionRepository;
    }

    @PostMapping("/submit/{examId}")
    public Map<String, Object> submitExam(
            @PathVariable Long examId,
            @RequestBody Map<String, Object> request) {

        Long userId = Long.valueOf(request.get("userId").toString());

        Map<String, String> answers =
                ((Map<?, ?>) request.getOrDefault("answers", Map.of()))
                        .entrySet()
                        .stream()
                        .collect(java.util.stream.Collectors.toMap(
                                e -> e.getKey().toString(),
                                e -> e.getValue().toString()
                        ));

        int tabSwitches = request.get("tabSwitches") == null
                ? 0 : Integer.parseInt(request.get("tabSwitches").toString());

        List<Question> questions = questionRepository.findByExamId(examId);
        int score = 0;

        for (Question question : questions) {
            String answer = answers.get(question.getId().toString());

            if (answer != null
                    && answer.equalsIgnoreCase(question.getCorrectOption())) {
                score++;
            }
        }

        Result result = new Result();
        result.setUserId(userId);
        result.setExamId(examId);
        result.setScore(score);
        result.setTotal(questions.size());
        result.setTabSwitches(tabSwitches);

        Result saved = resultRepository.save(result);

        return Map.of(
                "resultId", saved.getId(),
                "score", score,
                "total", questions.size(),
                "tabSwitches", tabSwitches
        );
    }

    @GetMapping
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Result> getUserResults(@PathVariable Long userId) {
        return resultRepository.findByUserId(userId);
    }
}
