import React, {Component, ErrorInfo, ReactNode} from 'react';
import {L} from '../../utils/helpers';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error information, send to a service, etc.
    L('fromErrorBoundary - error:', error);
    L('fromErrorBoundary - errorInfo:', errorInfo);

    // Optionally, you can set state here
    // this.setState({ hasError: true });
  }

  render() {
    // if (this.state.hasError) {
    //   // You can render any custom fallback UI
    //   return <h1>Something went wrong.</h1>;
    // }

    return this.props.children;
  }
}

export default ErrorBoundary;
