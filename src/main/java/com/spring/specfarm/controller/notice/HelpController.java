package com.spring.specfarm.controller.notice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.specfarm.common.FileUtils;
import com.spring.specfarm.entity.Help;
import com.spring.specfarm.service.notice.HelpService;

@RestController
@RequestMapping("/cs/help")
public class HelpController {
	@Autowired
	HelpService helpService;
	
	@GetMapping("")
	public Map<String, Object> getWrittenHelp(@AuthenticationPrincipal String userId) {
		try {
			Map<String, Object> responseMap = new HashMap<String, Object>();
			
			List<Help> helpList = helpService.getHelpList(userId);
			
			System.out.println(helpList);
			
			responseMap.put("helpList", helpList);
			
			return responseMap;
			
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			
			return errorMap;
		}
	}
	
	@PostMapping("/write")
	public String writeHelp(@ModelAttribute Help help, MultipartFile attached, @AuthenticationPrincipal String userId, HttpSession session) {
		try {
			help.setUserId(userId);
			
			if (!attached.isEmpty()) {				
				FileUtils fileUtils = new FileUtils();
				help.setAttachedFile(fileUtils.parseFileInfo(session, attached, "cs/help").get("FileName"));
			}
			
			System.out.println(help);
			
			helpService.insertHelp(help);
			return "success";
		} catch (Exception e) {
			return "error";
		}
	}
}
