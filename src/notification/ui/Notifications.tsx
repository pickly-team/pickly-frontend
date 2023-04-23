import NotificationSlideItem from '@/notification/ui/NotificationSlideItem';

const Notifications = () => {
  return (
    <div>
      <NotificationSlideItem
        bookMarkInfo={{
          id: '1',
          title:
            'React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.',
        }}
        createdAt={new Date('2023-04-23 12:00:00')}
        isRead={false}
      />
      <NotificationSlideItem
        bookMarkInfo={{
          id: '1',
          title:
            'React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.',
        }}
        createdAt={new Date('2023-04-23 12:00:00')}
        isRead={true}
      />
      <NotificationSlideItem
        bookMarkInfo={{
          id: '1',
          title:
            'React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.React 다뤄보기를 하는 줄 알았지만 사실 스프링이엇던.',
        }}
        createdAt={new Date('2023-04-23 12:00:00')}
        isRead={true}
      />
    </div>
  );
};

export default Notifications;
