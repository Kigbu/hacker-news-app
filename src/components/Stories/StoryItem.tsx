import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import AppText from '../widgets/Text';
import Story from 'core/models/story.model';
import {w} from 'utils/responsive';
import {family} from 'theme';
import newsService from 'core/services/news.service';
import useApiClient from 'core/hooks/useClient';

interface StoryItemProps {
  itemId: number;
}

export default function StoryItem({itemId}: StoryItemProps) {
  const {client} = useApiClient('');

  const [story, setStory] = React.useState<Story>(new Story(null));

  React.useEffect(() => {
    if (itemId) getStory(itemId);
  }, [itemId]);

  const getStory = async (itemId: number) => {
    const {ok, data}: any = await newsService.getStory(client, itemId);

    if (data && data.url) setStory(data);

    // console.log("Story Dataaaaa: ::::: :>> ", JSON.stringify(data, null, 4));
  };

  return (
    <TouchableOpacity>
      <AppText
        style={{
          fontSize: w(14),
          fontFamily: family.Bold,
          color: '#1F1F1F',
          lineHeight: w(16),
        }}>
        {story.title || ''}
      </AppText>
    </TouchableOpacity>
  );
}
