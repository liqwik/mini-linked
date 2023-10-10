import logging
# Create a logger instance


def format_log(logger: logging.Logger) -> logging.Logger:
    # Set the log level (e.g., INFO, WARNING, ERROR, DEBUG)
    logger.setLevel(logging.INFO)

    # Create a file handler for error logging
    error_handler = logging.FileHandler('error.log')
    error_handler.setLevel(logging.ERROR)

    # Create a file handler for access logs
    access_handler = logging.FileHandler('access.log')
    access_handler.setLevel(logging.INFO)

    # Create a log format
    log_format = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    # Set the format for the handlers
    error_handler.setFormatter(log_format)
    access_handler.setFormatter(log_format)

    # Add the handlers to the logger
    logger.addHandler(error_handler)
    logger.addHandler(access_handler)
    return logger
