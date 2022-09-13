package com.spring.specfarm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_ASK_FILE")
@IdClass(AskFileId.class)
public class AskFile {
	@Id
	private int askFileIdx;
	
	@Id
	@ManyToOne
	@JoinColumn(name="ASK_IDX")
	private Ask ask;
	
	@Column(columnDefinition = "varchar(1000)")
	private String askFileName;
}
	
	
