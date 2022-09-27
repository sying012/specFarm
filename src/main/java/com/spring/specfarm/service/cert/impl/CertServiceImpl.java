package com.spring.specfarm.service.cert.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Arg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Cert;
import com.spring.specfarm.entity.CertContents;
import com.spring.specfarm.entity.CertTest;
import com.spring.specfarm.entity.FavCertId;
import com.spring.specfarm.mapper.CertMapper;
import com.spring.specfarm.repository.CertContentsRepository;
import com.spring.specfarm.repository.CertRepository;
import com.spring.specfarm.repository.CertTestRepository;
import com.spring.specfarm.repository.FavCertRepository;
import com.spring.specfarm.service.cert.CertService;

@Service
public class CertServiceImpl implements CertService {

	@Autowired
	CertRepository certRepository;
	
	@Autowired
	FavCertRepository favCertRepository;

	@Autowired
	private CertTestRepository certTestRepository;

	@Autowired
	private CertContentsRepository certContentsRepository;
	
	@Autowired
	private CertMapper certMapper;

	@Override
	public void setCertficationList(List<Map<String, Object>> list) {
		for (int i = 0; i < list.size(); i++) {
			Cert cert = new Cert();
			int certIdx = certRepository.getNextCertIndex();

			cert.setCertIdx(certIdx);
			cert.setObligfldcd(list.get(i).get("obligfldcd").toString());
			cert.setObligfldnm(list.get(i).get("obligfldnm").toString());
			cert.setMdobligfldcd(list.get(i).get("mdobligfldcd").toString());
			cert.setMdobligfldnm(list.get(i).get("mdobligfldnm").toString());
			cert.setJmcd(list.get(i).get("jmcd").toString());
			cert.setJmfldnm(list.get(i).get("jmfldnm").toString());

			 //certRepository.save(cert);

		}
	}

	@Override
	public List<String> getJmcdList() {
		return certTestRepository.getJmcdList();
		
	}

	@Override
	public void setCertTestList(List<Map<String, Object>> list) {

		for (int i = 0; i < list.size(); i++) {
			// System.out.println( list.size());
			CertTest certtest = new CertTest();
			int certTestIdx = certTestRepository.getNextCertTestIndex();

			certtest.setCertTestIdx(certTestIdx);
			if(list.get(i).get("implplannm").toString() != null) {
				certtest.setImplplannm(list.get(i).get("implplannm").toString());
			} else {
				certtest.setImplplannm(null);
			}
			
			if(list.get(i).get("docregstartdt") != null) {
				certtest.setDocregstartdt(list.get(i).get("docregstartdt").toString());
			} else {
				certtest.setDocregstartdt(null);
			}
			
			if(list.get(i).get("docregenddt") != null) {
				certtest.setDocregenddt(list.get(i).get("docregenddt").toString());
			} else {
				certtest.setDocregenddt(null);
			}
			
			if(list.get(i).get("docexamstartdt") != null) {
				certtest.setDocexamstartdt(list.get(i).get("docexamstartdt").toString());
			} else {
				certtest.setDocexamstartdt(null);
			}
			
			if(list.get(i).get("docpassdt") != null) {
				certtest.setDocpassdt(list.get(i).get("docpassdt").toString());
			} else {
				certtest.setDocpassdt(null);
			}
			
			if(list.get(i).get("pracregstartdt") != null) {
				certtest.setPracregstartdt(list.get(i).get("pracregstartdt").toString());
			} else {
				certtest.setPracregstartdt(null);
			}
			
			if(list.get(i).get("pracregenddt") != null) {
				certtest.setPracregenddt(list.get(i).get("pracregenddt").toString());
			} else {
				certtest.setPracregenddt(null);
			}
			
			if(list.get(i).get("pracexamstartdt") != null) {
				certtest.setPracexamstartdt(list.get(i).get("pracexamstartdt").toString());
			} else {
				certtest.setPracexamstartdt(null);
			}
			
			if(list.get(i).get("pracexamenddt") != null) {
				certtest.setPracexamenddt(list.get(i).get("pracexamenddt").toString());
			} else {
				certtest.setPracexamenddt(null);
			}
			
			if(list.get(i).get("pracpassstartdt") != null) {
				certtest.setPracpassstartdt(list.get(i).get("pracpassstartdt").toString());
			} else {
				certtest.setPracpassstartdt(null);
			}
			
			if(list.get(i).get("jmfldnm") != null) {
				certtest.setJmfldnm(list.get(i).get("jmfldnm").toString());
			} else {
				certtest.setJmfldnm(null);
			}
			//certTestRepository.save(certtest);
		}
	}


	public void setCertContents(List<Map<String, Object>> list) {
		 System.out.println("////////////////////////////////////////////////"+list.size());

		for (int i = 0; i < list.size(); i++) {
			CertContents certcontents = new CertContents();
			int certContentsIdx = certContentsRepository.getNextCertContentsIndex();
			
			certcontents.setCertContentsIdx(certContentsIdx);
			
			if(list.get(i).get("contents") != null) {
				certcontents.setContents(list.get(i).get("contents").toString());
			} else {
				certcontents.setContents(null);
			}
			
			if(list.get(i).get("jmfldnm") != null) {
				certcontents.setJmfldnm(list.get(i).get("jmfldnm").toString());
			} else {
				certcontents.setJmfldnm(null);
			}

			//certContentsRepository.save(certcontents);

		}
	}

	

	@Override
	public List<Map<String, Object>> getCertLList() {
		return certMapper.getCertLList();
	}
	
	
	@Override
	public List<Map<String, Object>> getCertMList(String obligfldnm) {
		return certMapper.getCertMList(obligfldnm);
	}
	
	@Override
	public List<Map<String, Object>> getCertSList(String mdobligfldnm) {
		return certMapper.getCertSList(mdobligfldnm);
	}
	
	@Override
	public List<Map<String, Object>>getTestList(String jmcd) {
		return certMapper.getTestList(jmcd);
	}
	
	@Override
	   public List<Map<String, Object>> getCertList() {
	      return certMapper.getCertList();
	   }
	
	@Override
	public List<Map<String, Object>> getCertSearch(String searchKeyword) {
		return certMapper.getCertSearch(searchKeyword);
	}
	
	@Override
	public List<Map<String, Object>> getContentList() {
	      return certMapper.getContentList();
	}
	
	@Override
    public Map<String, Object> getHeartState(String cert_idx) {
		return certMapper.getHeartState(cert_idx);
    }
	
	@Override
    public int setHeart(String cert_idx, String userId) {
		return certMapper.setHeart(cert_idx, userId);
    }
	
	@Override
    public int putHeart(String cert_idx, String userId) {
		FavCertId favCertId = new FavCertId();
		favCertId.setCertIdx(Integer.parseInt(cert_idx));
		favCertId.setUserId(userId);
		favCertRepository.deleteById(favCertId);
		return 1;
    }

	@Override
	public String getCertIdx(String cert_idx) {
		return certMapper.getCertIdx(cert_idx);
	}



}

