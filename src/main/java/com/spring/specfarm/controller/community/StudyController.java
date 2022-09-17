package com.spring.specfarm.controller.community;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.service.community.StudyService;

@RestController
@RequestMapping("/community/study")
public class StudyController {
	@Autowired
	StudyService studyService;

	@GetMapping("/getUser")
	public Map<String, Object> getUser(@AuthenticationPrincipal String userId) {
		try {
			User user = studyService.getUser(userId);

			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("user", user);

			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}

	}

	@PostMapping("/register")
	public Map<String, Object> insertStudy(@ModelAttribute Study study, @AuthenticationPrincipal String userId) {
		try {
			System.out.println("11111111111111");
			System.out.println(userId + "gg");
			User user = new User();
			user.setUserId(userId);
			study.setUser(user);
			int studyIdx = studyService.insertStudy(study);
			System.out.println(studyIdx);
			
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("studyIdx", studyIdx);
			return response;
		} catch (Exception e) {

			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}
}
