package com.spring.specfarm.service.cert;

import java.util.List;
import java.util.Map;

import com.spring.specfarm.entity.Cert;

public interface CertService {
	//api 정보 db 저장
	void setCertficationList(List<Map<String, Object>> list);
	
	//종목코드 리스트 조회
	List<String> getJmcdList();	
	
	//api 정보 db 저장
	void setCertTestList(List<Map<String, Object>> list);

	List<Map<String, Object>> getCertLList();
	
	void setCertContents(List<Map<String, Object>> list);

	List<Map<String, Object>> getCertMList(String obligfldnm);
	
	List<Map<String, Object>> getCertSList(String mdobligfldnm);
}
