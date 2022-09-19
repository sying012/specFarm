package com.spring.specfarm.service.community.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.StudyFile;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.StudyRepository;
import com.spring.specfarm.service.community.StudyService;

@Service
public class StudyServiceImpl implements StudyService {

	@Autowired
	StudyRepository studyRepository;
	
	@Override
	public User getUser(String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int insertStudy(Study study) {
		System.out.println("22222222222222222");
		studyRepository.save(study);
		return study.getStudyIdx();
	}

	@Override
	public void insertStudyFileList(List<StudyFile> fileList) {
		for (StudyFile studyFile : fileList) {
//			studyFile.setStudyFileIdx(studyFileRepository.selectNextFileSeqByBoardSeq(boardFile.getBoard().getBoardSeq()));
//			boardFileRepository.save(boardFile);
		}
		
	}

}
