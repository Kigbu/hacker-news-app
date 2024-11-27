import {useRoute} from '@react-navigation/native';
import SafeAreaComp from 'components/Layout/SafeAreaComp';
import LoadingComp from 'components/LoadingComp/LoadingComp';
import AppText from 'components/widgets/Text';
import useApiClient from 'core/hooks/useClient';
import Story from 'core/models/story.model';
import newsService from 'core/services/news.service';
import {techImages} from 'data/tech-imgs';
import {Profile} from 'iconsax-react-native';
import React from 'react';
import {Image, View} from 'react-native';
import {family} from 'theme';
import colors from 'theme/colors';
import {height} from 'utils/dimensions';
import {getRandomImageUrl} from 'utils/helpers';
import {h, w} from 'utils/responsive';

export default function StoryDetails() {
  const route: any = useRoute();

  const {client} = useApiClient('');
  const [story, setStory] = React.useState<Story>(new Story(null));
  const [loading, setLoading] = React.useState(true);

  const storyId: number = route?.params?.storyId;

  React.useEffect(() => {
    if (storyId) getStory(storyId);
  }, [storyId]);

  const getStory = async (storyId: number) => {
    setLoading(true);
    const {ok, data}: any = await newsService.getStory(client, storyId);

    if (data && data.url) {
      const _data = {
        ...data,
        imgUrl: getRandomImageUrl(techImages),
      };

      setStory(_data);
    }
    setLoading(false);
  };

  console.log('story :>> ', JSON.stringify(story, null, 4));

  return (
    <SafeAreaComp refreshing={false} style={{padding: 0}}>
      <View style={{minHeight: height, gap: w(24)}}>
        <Image
          // source={{uri: story.imgUrl}}
          source={{uri: techImages[0]}}
          style={{height: h(250), width: '100%'}}
        />

        <View style={{paddingHorizontal: w(24), gap: w(8)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: w(8),
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: w(4),
                backgroundColor: colors.grey100,
                borderRadius: 99,
              }}>
              <Profile variant={'Bulk'} size={w(16)} color={colors.grey900} />
            </View>

            <View style={{marginRight: 'auto'}}>
              <AppText
                style={{
                  color: colors.grey950,
                  fontSize: w(12),
                  fontFamily: family.ExtraBold,
                  lineHeight: w(24),
                }}>
                {story.by}
              </AppText>
            </View>
          </View>

          <AppText
            type="header"
            style={{
              color: colors.grey950,
              fontSize: w(20),
              fontFamily: family.ExtraBold,
              lineHeight: w(26),
            }}>
            {story.title}
          </AppText>
        </View>
      </View>

      {loading && <LoadingComp />}
    </SafeAreaComp>
  );
}
