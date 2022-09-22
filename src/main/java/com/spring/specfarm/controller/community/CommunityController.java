package com.spring.specfarm.controller.community;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.Study;
import com.spring.specfarm.service.community.AskService;
import com.spring.specfarm.service.community.CommunityService;

@RestController
@RequestMapping("/community")
public class CommunityController {
	@Autowired
	private CommunityService communityService;
	
	@Autowired
	AskService askService;
	
	@GetMapping("")
	public Map<String, Object> getCommunity() {
		try {
			Map<String, Object> responseMap = new HashMap<String, Object>();
			
			List<Study> popularStudys = communityService.getStudys();
			responseMap.put("popularStudys", popularStudys);
			
			List<Ask> popularAsks = communityService.getAsks();
			for(Ask ask: popularAsks) {
				ask.setCountReply(askService.getAskReplyCount(ask.getAskIdx()));
			}
			responseMap.put("popularAsks", popularAsks);
			
			List<Share> popularShares = communityService.getShares();
			responseMap.put("popularShares", null);
			
			return responseMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			
			return errorMap;
		}
	}
}
