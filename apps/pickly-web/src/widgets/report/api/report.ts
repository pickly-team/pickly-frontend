import { GET_BOOKMARK_LIST } from '@/widgets/bookmarks/api/bookmark';
import {
  CustomAxiosError,
  ErrorTypes,
} from '@/shared/ui/Error/ApiErrorBoundary';
import useToast from '@/shared/ui/Toast/hooks/useToast';
import client from '@/shared/common/service/client';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export type REPORT_TYPE = 'BOOKMARK' | 'COMMENT' | 'MEMBER';

// 북마크 신고
interface POSTBookmarkReportRequest {
  reporterId: number;
  reportedId: number;
  content: string;
  reportType: REPORT_TYPE;
}

const postReportAPI = async (postData: POSTBookmarkReportRequest) => {
  const { data } = await client({
    method: 'post',
    url: '/reports',
    data: postData,
  });

  return data;
};

export interface POSTBookmarkReportMutation {
  reporterId: number;
  reportType: REPORT_TYPE;
}

export const usePostReportMutation = ({
  reporterId,
  reportType,
}: POSTBookmarkReportMutation) => {
  const queryClient = useQueryClient();
  const { fireToast } = useToast();
  const router = useNavigate();
  return useMutation(
    postReportAPI,
    refetchReportQuery(reporterId, reportType, queryClient, fireToast, router),
  );
};

const refetchReportQuery = (
  reporterId: number,
  reportType: REPORT_TYPE,
  queryClient: QueryClient,
  fireToast: ReturnType<typeof useToast>['fireToast'],
  router: ReturnType<typeof useNavigate>,
) => {
  if (reportType === 'BOOKMARK') {
    return {
      onSuccess: () => {
        // NOTE : 추후 어드민 페이지 개발 후 사용될 REFETCH 기능
        queryClient.invalidateQueries(
          GET_BOOKMARK_LIST(reporterId, '💡 모두보기', 0),
        );
        queryClient.invalidateQueries(
          GET_BOOKMARK_LIST(reporterId, '👀 읽음', 0),
        );
        queryClient.invalidateQueries(
          GET_BOOKMARK_LIST(reporterId, '🫣 읽지 않음', 0),
        );
        fireToast({
          message: '신고 되었습니다',
          mode: 'SUCCESS',
        });
        router(-1);
      },
      onError: (e: CustomAxiosError) => {
        if (e.response?.data.code === ErrorTypes.PRIVATE_BOOKMARK) {
          fireToast({
            message: '이미 신고한 북마크에요',
            mode: 'DELETE',
          });
        }
        router(-1);
      },
    };
  } else if (reportType === 'COMMENT') {
    return {
      onSuccess: () => {
        fireToast({
          message: '신고 되었습니다',
          mode: 'SUCCESS',
        });
        router(-1);
      },
      onError: (e: CustomAxiosError) => {
        if (e.response?.data.code === ErrorTypes.PRIVATE_BOOKMARK) {
          fireToast({
            message: '이미 신고한 댓글이에요',
            mode: 'DELETE',
          });
          router(-1);
        }
      },
    };
  } else if (reportType === 'MEMBER') {
    return {
      onSuccess: () => {
        fireToast({
          message: '신고 되었습니다',
          mode: 'SUCCESS',
        });
        router(-1);
      },
      onError: (e: CustomAxiosError) => {
        if (e.response?.data.code === ErrorTypes.PRIVATE_BOOKMARK) {
          fireToast({
            message: '이미 신고한 북마크에요',
            mode: 'DELETE',
          });
          router(-1);
        }
      },
    };
  } else {
    throw new Error('reportType이 잘못되었습니다');
  }
};
