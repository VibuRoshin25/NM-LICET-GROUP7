package com.nova.exceptions.exceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.nova.exceptions.AuthenticationException;
import com.nova.exceptions.EmailException;
import com.nova.exceptions.PhoneNumberException;
import com.nova.exceptions.SignUpException;
import com.nova.model.ErrorResponse;
import com.nova.utility.enums.SecurityCode;

@RestControllerAdvice
public class PrimaryHandler extends ResponseEntityExceptionHandler {
	

	@ResponseStatus(value=HttpStatus.FORBIDDEN)
    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<ErrorResponse> handleAuthorizationException(Exception ex,WebRequest Request) {
        return new ResponseEntity<>(Generator(SecurityCode.AUTHORIZATIONERROR), HttpStatus.FORBIDDEN);
    }
    
	@ResponseStatus(value=HttpStatus.FORBIDDEN)
    @ExceptionHandler({SignUpException.class})
    public ResponseEntity<ErrorResponse> handleSignUp(Exception ex,WebRequest Request) {
        return new ResponseEntity<>(Generator(SecurityCode.SIGNUPERROR), HttpStatus.FORBIDDEN);
    }
	
	@ResponseStatus(value=HttpStatus.FORBIDDEN)
    @ExceptionHandler({PhoneNumberException.class})
    public ResponseEntity<ErrorResponse> handlePhoneNumber(Exception ex,WebRequest Request) {
        return new ResponseEntity<>(Generator(SecurityCode.PHONENUMBERERROR), HttpStatus.FORBIDDEN);
    }
	
	@ResponseStatus(value=HttpStatus.FORBIDDEN)
    @ExceptionHandler({EmailException.class})
    public ResponseEntity<ErrorResponse> handleEmail(Exception ex,WebRequest Request) {
        return new ResponseEntity<>(Generator(SecurityCode.EMAILERROR), HttpStatus.FORBIDDEN);
    }
    
    @ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex,WebRequest Request) {
        return new ResponseEntity<>(Generator(SecurityCode.RUNTIMEERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    
    
    public ErrorResponse Generator(SecurityCode Code) {
		ErrorResponse responseModel = new ErrorResponse();
		responseModel.setCode(Code.getCode());
		responseModel.setLevel(Code.getLevel());
		responseModel.setDescription(Code.getDescription());
		return responseModel;
	}
}
