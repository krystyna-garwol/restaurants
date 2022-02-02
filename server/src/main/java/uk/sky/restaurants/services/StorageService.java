package uk.sky.restaurants.services;

import com.amazonaws.services.s3.AmazonS3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class StorageService {

    @Value("${aws.endpointUrl}")
    private String endpointUrl;

    @Value("${aws.bucketName}")
    private String bucketName;

    @Autowired
    private AmazonS3 amazonS3;

    public String uploadFile(MultipartFile multipartFile) {
        String fileUrl = "";
        try {
            File file = convertMultiPartToFile(multipartFile);
            String fileName = multipartFile.getOriginalFilename();
            fileUrl = endpointUrl + "/" + fileName;
            amazonS3.putObject(bucketName, fileName, file);
            file.delete();
        } catch(Exception e) {
            e.printStackTrace();
        }
        return fileUrl;
    }


    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }
}
