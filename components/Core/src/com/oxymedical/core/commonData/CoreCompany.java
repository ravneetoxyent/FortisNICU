package com.oxymedical.core.commonData;
import java.util.HashSet;
import java.util.Set;

/**
 * Company generated by hbm2java
 */
public class CoreCompany  implements java.io.Serializable {

	private String companyId;
     private String homeUrl;
     
     // Constructors

    /** default constructor */
    public CoreCompany() {
    }

	/** minimal constructor */
    public CoreCompany(String companyId) {
        this.companyId = companyId;
    }
    /** full constructor */
    public CoreCompany(String companyId, String homeUrl) {
       this.companyId = companyId;
       this.homeUrl = homeUrl;
    }
    
   
    // Property accessors
    public String getCompanyId() {
        return this.companyId;
    }
    
    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }
    public String getHomeUrl() {
        return this.homeUrl;
    }
    
    public void setHomeUrl(String homeUrl) {
        this.homeUrl = homeUrl;
    }
}


