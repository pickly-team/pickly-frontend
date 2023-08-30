import React, { Component } from 'react';
import { AxiosError } from 'axios';
import NetworkError from './NetworkError';
import { PostBridgeParams } from '@/common/service/hooks/useWebview';

type ErrorType = 'NO_USER_INFO' | 'PRIVATE_BOOKMARK' | 'DUPLICATED_NICKNAME';

export const ErrorTypes: Record<ErrorType, string> = {
  NO_USER_INFO: 'M001',
  DUPLICATED_NICKNAME: 'M002',
  PRIVATE_BOOKMARK: 'B002',
} as const;

interface CustomData {
  message: string;
  code: ErrorType;
}

export type CustomAxiosError = AxiosError<CustomData>;

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

  static getDerivedStateFromError(error: CustomAxiosError): State {
    if (
      error.response &&
      error.response.data?.code !== ErrorTypes.PRIVATE_BOOKMARK
    ) {
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
