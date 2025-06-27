## Global Error Handling with @ControllerAdvice

- Created `GlobalExceptionHandler.java`:
     - Handles field-level validation errors
     - Catches access denied, invalid credentials
     - Returns developer-readable messages