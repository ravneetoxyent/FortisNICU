package com.oxymedical.component.ldap.queryoperations;
import java.io.FileInputStream;

/**
    public void showAttributes(LDAPEntry entry) {
        LDAPAttributeSet as = null;
        LDAPAttribute attr = null;
        Iterator allAttrs;
        Enumeration allAttrValues;
        as = entry.getAttributeSet();
        allAttrs = as.iterator();
      //  LDAPComponent.logger.log(0,"    Attributes:");
        while(allAttrs.hasNext()) {
            attr = (LDAPAttribute)allAttrs.next();
          //  LDAPComponent.logger.log(0,"        " + attr.getName());
            allAttrValues = attr.getStringValues();
            if( allAttrValues != null) {
                while(allAttrValues.hasMoreElements()) {
                    value = (String) allAttrValues.nextElement();
                  //  LDAPComponent.logger.log(0,"            " + value);
                }
            }
        }
    }
}