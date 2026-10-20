
package com.sxcce.examportal.repository;

import com.sxcce.examportal.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {
}
