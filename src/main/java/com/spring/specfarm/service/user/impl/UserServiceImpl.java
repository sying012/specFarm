package com.spring.specfarm.service.user.impl;

import java.net.MulticastSocket;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.User;
import com.spring.specfarm.mapper.FavCertMapper;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.user.UserService;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private FavCertMapper favCertMapper;
	
	// user 가져오기
	@Override
	public User getUser(String userId) {
		if(userRepository.findById(userId).isEmpty()) {
			return null;
		}else {
			return userRepository.findById(userId).get();
		}
		
	}

	@Override
	public User idCheck(User user) {
		if (userRepository.findById(user.getUserId()).isPresent()) {
			return userRepository.findById(user.getUserId()).get();
		} else {
			return null;
		}
	}

	@Override
	public User telCheck(User user) {
		if (userRepository.findByUserTel(user.getUserTel()) != null) {
			return userRepository.findByUserTel(user.getUserTel());
		} else {
			return null;
		}
	}

	@Override
	public User join(User user) {
		return userRepository.save(user);
	}

	@Override
	public User login(String userId, String userPw) {
		if (userRepository.findById(userId).isPresent()) {
			User loginUser = userRepository.findById(userId).get();
			if (loginUser.getUserYn().equals("Y") && passwordEncoder.matches(userPw, loginUser.getUserPw())) {
				return loginUser;
			}
		}

		return null;
	}

	@Override
	public User findUser(User user) {
		User findUser;
		if (user.getUserId() == null || user.getUserId() == "") {
			findUser = userRepository.findByUserNameAndUserTel(user.getUserName(), user.getUserTel());
		} else {
			findUser = userRepository.findByUserIdAndUserNameAndUserTel(user.getUserId(),
					user.getUserName(), user.getUserTel());
		}

		if (findUser != null) {
			return findUser;
		} else {
			return null;
		}
	}

	@Override
	public void pwReset(User user) {
		User findUser = userRepository.findByUserIdAndUserNameAndUserTel(user.getUserId(),
				user.getUserName(), user.getUserTel());

		findUser.setUserPw(user.getUserPw());
		userRepository.save(findUser);
	}

	@Override
	public void certifiedPhoneNumber(String phoneNumber, String numStr) {
		String api_key = "NCSMIADEQC0PECP7";
		String api_secret = "UVDFRLBBNETU35KVPBV1YTEPVRJTQHNQ";
		Message coolsms = new Message(api_key, api_secret);

		HashMap<String, String> params = new HashMap<String, String>();
		params.put("to", phoneNumber); // 수신전화번호
		params.put("from", "01084393070"); // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
		params.put("type", "SMS");
		params.put("text", "[specFarm] 인증번호 [" + numStr + "]를 입력해주세요.");
		params.put("app_version", "test app 1.2"); // application name and version

		try {
			JSONObject obj = (JSONObject) coolsms.send(params);
		} catch (CoolsmsException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCode());
		}

	}

	@Override
	public List<Map<String, Object>> getUserFavCert(String userId) {
//		List<Map<String, Object>> favCertList = favCertMapper.getFavCert(userId);
		
		return null;
	}

	@Override
	public List<Map<String, Object>> getCertRegList() {
		List<Map<String, Object>> regList = new ArrayList<>();
		getDocregList(regList, favCertMapper.getCertDocreg(), regList.size());
		getPracregList(regList, favCertMapper.getCertPracreg(), regList.size());
		
		return dateSort(regList);
	}

	@Override
	public List<Map<String, Object>> getCertExamList() {
		List<Map<String, Object>> examList = new ArrayList<>();
		getDocexamList(examList, favCertMapper.getCertDocexam(), examList.size());
		getPracxamList(examList, favCertMapper.getCertPracexam(), examList.size());

		return dateSort(examList);
	}

	@Override
	public List<Map<String, Object>> getFavCertRegList(String userId) {
		List<Map<String, Object>> regList = new ArrayList<>();
		getDocregList(regList, favCertMapper.getFavCertDocreg(userId), regList.size());
		getPracregList(regList, favCertMapper.getFavCertPracreg(userId), regList.size());
		
		return dateSort(regList);
	}

	@Override
	public List<Map<String, Object>> getFavCertExamList(String userId) {
		List<Map<String, Object>> examList = new ArrayList<>();
		getDocexamList(examList, favCertMapper.getFavCertDocexam(userId), examList.size());
		getPracxamList(examList, favCertMapper.getFavCertPracexam(userId), examList.size());
		
		return dateSort(examList);
	}

	@Override
	public List<Map<String, Object>> getFavCertAlert(String userId) {
		List<Map<String, Object>> alertList = new ArrayList<>();
		
		getAlertMap(alertList, favCertMapper.getFavCertDocregDday(userId), alertList.size(), "필기시험 원서접수");
		getAlertMap(alertList, favCertMapper.getFavCertDocexamDday(userId), alertList.size(), "필기시험");
		getAlertMap(alertList, favCertMapper.getFavCertDocpassDday(userId), alertList.size(), "필기시험 합격자 발표");
		getAlertMap(alertList, favCertMapper.getFavCertPracregDday(userId), alertList.size(), "실기시험 원서접수");
		getAlertMap(alertList, favCertMapper.getFavCertPracexamDday(userId), alertList.size(), "실기시험");
		getAlertMap(alertList, favCertMapper.getFavCertPracpassDday(userId), alertList.size(), "실기시험 합격자 발표");
		
		return dateSort(alertList);
	}
	
	public List<Map<String, Object>> getAlertMap(List<Map<String, Object>> alertList, List<Map<String, Object>> list, int index, String cat) {
		for (int i = 0; i < list.size(); i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", index++);
			map.put("certName", list.get(i).get("jmfldnm"));
			map.put("cat", cat);
			map.put("startDate", String.valueOf(list.get(i).get("dday")));
			map.put("open", true);
			
			alertList.add(map);
		}

		return alertList;
	}
	
	public List<Map<String, Object>> getDocregList(List<Map<String, Object>> regList, List<Map<String, Object>> docregList, int index) {
		for (int i = 0; i < docregList.size(); i++) {
			Map<String, Object> docregmap = new HashMap<String, Object>();
			docregmap.put("idx", index++);
			docregmap.put("category", "필기시험 원서접수");
			docregmap.put("implplannm", docregList.get(i).get("implplannm"));
			docregmap.put("jmfldnm", docregList.get(i).get("jmfldnm"));
			docregmap.put("startDate", docregList.get(i).get("docregstartdt"));
			docregmap.put("endDate", docregList.get(i).get("docregenddt"));

			regList.add(docregmap);
		}
		
		return regList;
	}
	
	public List<Map<String, Object>> getPracregList(List<Map<String, Object>> regList, List<Map<String, Object>> pracregList, int index) {
		for (int i = 0; i < pracregList.size(); i++) {
			Map<String, Object> pracmap = new HashMap<String, Object>();
			pracmap.put("idx", index++);
			pracmap.put("category", "실기시험 원서접수");
			pracmap.put("implplannm", pracregList.get(i).get("implplannm"));
			pracmap.put("jmfldnm", pracregList.get(i).get("jmfldnm"));
			pracmap.put("startDate", pracregList.get(i).get("pracregstartdt"));
			pracmap.put("endDate", pracregList.get(i).get("pracregenddt"));

			regList.add(pracmap);
		}
		
		return regList;
	}
	
	public List<Map<String, Object>> getDocexamList(List<Map<String, Object>> examList, List<Map<String, Object>> docexamList, int index) {
		for(int i = 0; i < docexamList.size(); i++) {
			Map<String, Object> docregmap = new HashMap<String, Object>();
			docregmap.put("idx", index++);
			docregmap.put("category", "필기시험");
			docregmap.put("implplannm", docexamList.get(i).get("implplannm"));
			docregmap.put("jmfldnm", docexamList.get(i).get("jmfldnm"));
			docregmap.put("startDate", docexamList.get(i).get("docexamstartdt"));
			docregmap.put("endDate", docexamList.get(i).get("docexamenddt"));
			
			examList.add(docregmap);
		}
		
		return examList;
	}	

	
	public List<Map<String, Object>> getPracxamList(List<Map<String, Object>> examList, List<Map<String, Object>> pracexamList, int index) {
		for(int i = 0; i < pracexamList.size(); i++) {
			Map<String, Object> pracmap = new HashMap<String, Object>();
			pracmap.put("idx", index++);
			pracmap.put("category", "실기시험");
			pracmap.put("implplannm", pracexamList.get(i).get("implplannm"));
			pracmap.put("jmfldnm", pracexamList.get(i).get("jmfldnm"));
			pracmap.put("startDate", pracexamList.get(i).get("pracexamstartdt"));
			pracmap.put("endDate", pracexamList.get(i).get("pracexamenddt"));
			
			examList.add(pracmap);
		}
		
		return examList;
	}
	
	// cert plan list 날짜별 정렬
	public List<Map<String, Object>> dateSort(List<Map<String, Object>> list) {
		Collections.sort(list, new Comparator<Map<String, Object>>() {
			@Override
			public int compare(Map<String, Object> obj1, Map<String, Object> obj2) {
				String startDate1 = (String) obj1.get("startDate");
				String startDate2 = (String) obj2.get("startDate");
				return startDate1.compareTo(startDate2);
			}
		});
		return list;
	}


}
