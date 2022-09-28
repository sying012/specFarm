package com.spring.specfarm.service.cert;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.Cert;

public interface CertService {
	
	void setCertficationList(List<Map<String, Object>> list);
	
	List<String> getJmcdList();	
	
	void setCertTestList(List<Map<String, Object>> list);

	List<Map<String, Object>> getCertLList();
	
	void setCertContents(List<Map<String, Object>> list);

	List<Map<String, Object>> getCertMList(String obligfldnm);
	
	List<Map<String, Object>> getCertSList(String mdobligfldnm);
	
	List<Map<String, Object>> getTestList(String jmcd);
	
	List<Map<String, Object>> getCertList();
	
	List<Map<String, Object>> getCertSearch(String searchKeyword);
	
	List<Map<String, Object>> getContentList();
	
	Map<String, Object> getHeartState(String cert_idx);
	
	int setHeart(String cert_idx, String userId);
	
	int putHeart(String cert_idx, String userId);

	String getCertIdx(String cert_idx);

	boolean getHeart(String cert_idx, String userId);
	
}
