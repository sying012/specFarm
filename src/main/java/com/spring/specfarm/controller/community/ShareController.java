package com.spring.specfarm.controller.community;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.service.community.ShareService;

@RestController
@RequestMapping("/community/share")
public class ShareController {
	@Autowired
	ShareService shareService;
	
	@GetMapping("/getUser")
	public Map<String, Object> getUser(@AuthenticationPrincipal String userId){
		try {
			User user = shareService.getUser(userId);
			
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("user", user);
			
			return resultMap;
		} catch(Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	//Share List
	@GetMapping("")
	public Map<String, Object> getShare(@PageableDefault(page = 0, size = 8, sort="shareIdx") Pageable pageable) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			
			Page<Share> shareList = shareService.getShareList(pageable);
		
			resultMap.put("shareList", shareList);
		
			return resultMap;
		} catch(Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}
	
	
	
	
	
	
	
}
 