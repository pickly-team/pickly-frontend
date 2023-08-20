import React, { Component } from 'react';
import { AxiosError } from 'axios';
import NetworkError from './NetworkError';
import { PostBridgeParams } from '@/common/service/hooks/useWebview';

type ErrorType = 'NO_USER_INFO';

const ErrorTypes: Record<ErrorType, string> = {
  NO_USER_INFO: 'M001',
} as const;

interface CustomData {
  message: string;
  code: ErrorType;
}

type CustomAxiosError = AxiosError<CustomData>;

interface State {
  shouldHandleError: boolean;
  error: AxiosError | null;
}

interface Props {
  children: React.ReactNode;
  postMessage: (
    message: keyof PostBridgeParams,
    data: {
      url: string;
    } | null,
  ) => void;
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

  componentDidCatch(error: CustomAxiosError) {
    if (error.response?.data.code === ErrorTypes.NO_USER_INFO) {
      this.props.postMessage('signUp', null);
    }
  }

  render() {
    if (!this.state.shouldHandleError) {
      return this.props.children;
    }

    if (this.state.error && this.state.error.response) {
      return <NetworkError />;
    }

    return this.props.children;
  }
}

export default ApiErrorBoundary;
