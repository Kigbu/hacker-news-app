import React from 'react';
import useApiClient from 'core/hooks/useClient';
import newsService from 'core/services/news.service';
import {View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import SafeAreaComp from 'components/Layout/SafeAreaComp';
import AppText from 'components/widgets/Text';
import colors from 'theme/colors';
import {w} from 'utils/responsive';
import {height, width} from 'utils/dimensions';
import useRefresh from 'core/hooks/useRefresh';
import StoryItem from 'components/Stories/StoryItem';
import EmptyStoryComp from 'components/Stories/EmptyStoryComp';
import LoadingComp from 'components/LoadingComp/LoadingComp';

export default function HomeScreen() {
  const {client} = useApiClient('');

  const [loading, setLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [stories, setStories] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  React.useEffect(() => {
    getStories(page);
  }, [page]);

  const [version, setVersion] = React.useState('');

  const getStories = async (page: number) => {
    const limit = 20; // Number of items per page
    const data: any = await newsService.getTopStories(client, page, limit);

    if (data) {
      setStories(prev => [...prev, ...data]);
      setHasMore(data.length === limit);
    } else {
      setHasMore(false);
    }

    setLoading(false);
    setIsLoadingMore(false);
  };

  const initRefresh = () => {
    setStories([]); // Clear existing stories
    setPage(1); // Reset to the first page
    setHasMore(true); // Reset hasMore
  };

  const {refreshing, onRefresh} = useRefresh([initRefresh]);

  return (
    <SafeAreaComp noScrollView refreshing={false}>
      <View style={{minHeight: height}}>
        <FlatList
          data={stories}
          keyExtractor={(_, i) => i.toString()}
          onEndReached={() => {
            if (!isLoadingMore && hasMore) {
              setPage(prev => prev + 1);
            }
          }}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={() => (
            <View>
              <AppText
                type="header"
                style={{
                  color: colors.grey950,
                  fontSize: w(20),
                  lineHeight: w(26),
                }}>
                Stories
              </AppText>
            </View>
          )}
          contentContainerStyle={{
            gap: w(20),
            width: width - 48,
          }}
          renderItem={({item, index}) => (
            <View key={index.toString()}>
              <StoryItem itemId={item} />
            </View>
          )}
          ListEmptyComponent={() => <EmptyStoryComp />}
          ListFooterComponent={() => {
            if (isLoadingMore) {
              return (
                <View style={{paddingVertical: 16, alignItems: 'center'}}>
                  <ActivityIndicator size="small" color={colors.grey500} />
                </View>
              );
            }
            return null;
          }}
        />
      </View>

      {loading && <LoadingComp />}
    </SafeAreaComp>
  );
}
