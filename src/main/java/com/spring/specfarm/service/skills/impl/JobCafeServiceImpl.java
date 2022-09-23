package com.spring.specfarm.service.skills.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.JobCafe;
import com.spring.specfarm.mapper.JobCafeMapper;
import com.spring.specfarm.repository.JobCafeRepository;
import com.spring.specfarm.service.skills.JobCafeService;

@Service
public class JobCafeServiceImpl implements JobCafeService{
	
//	@Autowired
//	JobCafeRepository jobCafeRepository;
//	
//	@Autowired
//	JobCafeMapper jobCafeMapper;
//	
//	//http://localhost:8080/skills/jobCafe/dbinsertList [db등록]
//	
//	//API DB에 넣기
//	@Override
//	public void getJobCafe(List<Map<String, Object>> list) {
//		List<JobCafe> jobCafeList = new ArrayList<JobCafe>();
//		for(int i = 0; i < list.size(); i++) {
//			JobCafe jobCafe = new JobCafe();
//			int jobCafeIdx = jobCafeRepository.getNextJobCafeIdx();
//			
//			jobCafe.setJobCafeIdx(jobCafeIdx);
//			
//			//Null 처리
//			if(list.get(i).get("CAFE_NM") != null) {
//				jobCafe.setCafeName(list.get(i).get("CAFE_NM").toString());
//			}else { 
//				jobCafe.setCafeName(null);
//			}
//			
//			if(list.get(i).get("SMPL_INTRO") != null) {
//				jobCafe.setSmplIntro(list.get(i).get("SMPL_INTRO").toString());
//			}else {
//				jobCafe.setSmplIntro(null);
//			}
//			
////			if(list.get(i).get("SPACE_INFRO") != null) {
////				jobCafe.setSpaceInfo(list.get(i).get("SPACE_INFRO").toString());
////			}else {
////				jobCafe.setSpaceInfo(null);
////			}
//			
//			if(list.get(i).get("USE_DT") != null) {
//				jobCafe.setUseDate(list.get(i).get("USE_DT").toString());
//			}else {
//				jobCafe.setUseDate(null);
//			}
//			
//			if(list.get(i).get("HOLI_DD") != null) {
//				jobCafe.setHoliDate(list.get(i).get("HOLI_DD").toString());
//			}else {
//				jobCafe.setHoliDate(null);
//			}
//			
//			if(list.get(i).get("FACLT_INFO1") != null) {
//				jobCafe.setFacltInfo01(list.get(i).get("FACLT_INFO1").toString());
//			}else {
//				jobCafe.setFacltInfo01(null);
//			}
//			
//			if(list.get(i).get("FACLT_INFO2") != null) {
//				jobCafe.setFacltInfo02(list.get(i).get("FACLT_INFO2").toString());
//			}else {
//					jobCafe.setFacltInfo02(null);
//				}
//			
//			if(list.get(i).get("FACLT_INFO3") != null) {
//				jobCafe.setFacltInfo03(list.get(i).get("FACLT_INFO3").toString());
//			}else{
//				jobCafe.setFacltInfo03(null);
//			}
//			
//			if(list.get(i).get("FACLT_INFO4") != null) {
//				jobCafe.setFacltInfo04(list.get(i).get("FACLT_INFO4").toString());
//			}else{
//				jobCafe.setFacltInfo04(null);
//			}
//			
//			if(list.get(i).get("FACLT_INFO5") != null) {
//				jobCafe.setFacltInfo05(list.get(i).get("FACLT_INFO5").toString());
//			}else{
//				jobCafe.setFacltInfo05(null);
//			}
//			
//			if(list.get(i).get("FACLT_INFO6") != null) {
//				jobCafe.setFacltInfo06(list.get(i).get("FACLT_INFO6").toString());
//			}else{
//				jobCafe.setFacltInfo06(null);
//			}
//			
//			if(list.get(i).get("FACLT_INFO7") != null) {
//				jobCafe.setFacltInfo07(list.get(i).get("FACLT_INFO7").toString());
//			}else{
//				jobCafe.setFacltInfo07(null);
//			}
//			
//			if(list.get(i).get("FACLT_INFO8") != null) {
//				jobCafe.setFacltInfo08(list.get(i).get("FACLT_INFO8").toString());
//			}else{
//				jobCafe.setFacltInfo08(null);
//			}
//			
//			if(list.get(i).get("FACLT_INFO9") != null) {
//				jobCafe.setFacltInfo09(list.get(i).get("FACLT_INFO9").toString());
//			}else{
//				jobCafe.setFacltInfo09(null);
//			}
//			
//			if(list.get(i).get("FACLT_INF10") != null) {
//				jobCafe.setFacltInfo10(list.get(i).get("FACLT_INF10").toString());
//			}else{
//				jobCafe.setFacltInfo10(null);
//			}
//			
//			if(list.get(i).get("RSRV_SGGST1") != null) {
//				jobCafe.setRsrvSggst1(list.get(i).get("RSRV_SGGST1").toString());
//			}else{
//				jobCafe.setRsrvSggst1(null);
//			}
//			
//			if(list.get(i).get("RSRV_SGGST2") != null) {
//				jobCafe.setRsrvSggst2(list.get(i).get("RSRV_SGGST2").toString());
//			}else{
//				jobCafe.setRsrvSggst2(null);
//			}
//			
//			if(list.get(i).get("RSRV_SGGST3") != null) {
//				jobCafe.setRsrvSggst3(list.get(i).get("RSRV_SGGST3").toString());
//			}else{
//				jobCafe.setRsrvSggst3(null);
//			}
//			
//			if(list.get(i).get("RSRV_SGGST4") != null) {
//				jobCafe.setRsrvSggst4(list.get(i).get("RSRV_SGGST4").toString());
//			}else{
//				jobCafe.setRsrvSggst4(null);
//			}
//			
//			if(list.get(i).get("RSRV_SGGST5") != null) {
//				jobCafe.setRsrvSggst5(list.get(i).get("RSRV_SGGST5").toString());
//			}else{
//				jobCafe.setRsrvSggst5(null);
//			}
//			
//			if(list.get(i).get("RSRV_SGGST6") != null) {
//				jobCafe.setRsrvSggst6(list.get(i).get("RSRV_SGGST6").toString());
//			}else{
//				jobCafe.setRsrvSggst6(null);
//			}
//			
//			if(list.get(i).get("RSRV_SGGST7") != null) {
//				jobCafe.setRsrvSggst7(list.get(i).get("RSRV_SGGST7").toString());
//			}else{
//				jobCafe.setRsrvSggst7(null);
//			}
//			
//			if(list.get(i).get("RSRV_SGGST8") != null) {
//				jobCafe.setRsrvSggst8(list.get(i).get("RSRV_SGGST8").toString());
//			}else{
//				jobCafe.setRsrvSggst8(null);
//			}
//			
//			if(list.get(i).get("RSRV_SGGST9") != null) {
//				jobCafe.setRsrvSggst9(list.get(i).get("RSRV_SGGST9").toString());
//			}else{
//				jobCafe.setRsrvSggst9(null);
//			}
//			
//			if(list.get(i).get("RSRV_SGGST10") != null) {
//				jobCafe.setRsrvSggst10(list.get(i).get("RSRV_SGGST10").toString());
//			}else{
//				jobCafe.setRsrvSggst10(null);
//			}
//			
//			if(list.get(i).get("BASS_ADRES_CN") != null) {
//				jobCafe.setBassAdresCn(list.get(i).get("BASS_ADRES_CN").toString());
//			}else{
//				jobCafe.setBassAdresCn(null);
//			}
//			
//			if(list.get(i).get("GUGUN") != null) {
//				jobCafe.setGuGun(list.get(i).get("GUGUN").toString());
//			}else{
//				jobCafe.setGuGun(null);
//			}
//			
//			if(list.get(i).get("ROAD_ADRES2_CN") != null) {
//				jobCafe.setRoadAdresCn(list.get(i).get("ROAD_ADRES2_CN").toString());
//			}else{
//				jobCafe.setRoadAdresCn(null);
//			}
//			
//			if(list.get(i).get("FILE_NM") != null) {
//				jobCafe.setFileName(list.get(i).get("FILE_NM").toString());
//			}else{
//				jobCafe.setFileName(null);
//			}
//			
//			if(list.get(i).get("CAFE_TYPE_NM") != null) {
//				jobCafe.setCafeTypeName(list.get(i).get("CAFE_TYPE_NM").toString());
//			}else{
//				jobCafe.setCafeTypeName(null);
//			}
//			// 1. jobCafeRepository.save(jobCafe);
//			// 2. 
//			jobCafeList.add(jobCafe);
//		}
//		jobCafeRepository.saveAll(jobCafeList);
//	}
//	
//	
//	//jobCafeList
//	@Override
//	public List<Map<String, Object>> getJobCafeList() {
//		return jobCafeMapper.getJobCafeList();
//	}


		
	}

