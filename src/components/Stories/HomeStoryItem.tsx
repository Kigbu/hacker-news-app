import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import AppText from '../widgets/Text';
import Story from 'core/models/story.model';
import {h, w} from 'utils/responsive';
import {family} from 'theme';
import newsService from 'core/services/news.service';
import useApiClient from 'core/hooks/useClient';
import {getRandomImageUrl} from 'utils/helpers';
import {techImages} from 'data/tech-imgs';
import colors from 'theme/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {STORY_DETAILS} from 'core/constants/screen-names';

interface HomeStoryItemProps {
  itemId: number;
}

export default function HomeStoryItem({itemId}: HomeStoryItemProps) {
  const {client} = useApiClient('');
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

  const [story, setStory] = React.useState<Story>(new Story(null));

  React.useEffect(() => {
    if (itemId) getStory(itemId);
  }, [itemId]);

  const getStory = async (itemId: number) => {
    const {ok, data}: any = await newsService.getStory(client, itemId);

    if (data && data.url) {
      const _data = {
        ...data,
        imgUrl: getRandomImageUrl(techImages),
      };

      setStory(_data);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(STORY_DETAILS, {storyId: itemId});
      }}
      style={{
        gap: w(16),
        borderRadius: w(16),
        backgroundColor: colors.grey50,
        padding: w(16),
        display: 'flex',
        width: w(260),
      }}>
      <Image
        source={{uri: story.imgUrl}}
        style={{height: h(180), width: '100%', borderRadius: w(16)}}
      />

      <View>
        <AppText
          style={{
            fontSize: w(14),
            fontFamily: family.Bold,
            color: '#1F1F1F',
            lineHeight: w(16),
          }}>
          {story.title || ''}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
