package com.osds.peamo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:/application.properties")
public class PeamoApplication {

    public static void main(String[] args) {
        SpringApplication.run(PeamoApplication.class, args);
    }

}
