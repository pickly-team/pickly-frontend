import React, { Component, ErrorInfo } from 'react';
import { AxiosError } from 'axios';
import NetworkError from './NetworkError';

interface State {
  shouldHandleError: boolean;
  error: AxiosError | null;
}

interface Props {
  children: React.ReactNode;
}

class ApiErrorBoundary extends Component<Props, State> {
  state: State = {
    shouldHandleError: false,
    error: null,
  };

  static getDerivedStateFromError(error: AxiosError): State {
    if (error.response) {
      return {
        shouldHandleError: true,
        error,
      };
    }
    return {
      shouldHandleError: false,
      error: null,
    };
  }

  componentDidCatch(error: AxiosError, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);

    // TODO: Sentry에 에러 로그를 남기는 로직을 추가해야 합니다.
  }

  render() {
    if (!this.state.shouldHandleError) {
      return this.props.children;
    }

    if (this.state.error && this.state.error.response) {
      return <NetworkError params={{}} />;
    }

    return this.props.children;
  }
}

export default ApiErrorBoundary;
