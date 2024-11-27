import React from 'react';
import useApiClient from 'core/hooks/useClient';
import newsService from 'core/services/news.service';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SafeAreaComp from 'components/Layout/SafeAreaComp';
import AppText from 'components/widgets/Text';
import colors from 'theme/colors';
import {w} from 'utils/responsive';
import {height, width} from 'utils/dimensions';
import useRefresh from 'core/hooks/useRefresh';
import StoryItem from 'components/Stories/StoryItem';
import EmptyStoryComp from 'components/Stories/EmptyStoryComp';
import LoadingComp from 'components/LoadingComp/LoadingComp';

export default function Stories() {
  const {client} = useApiClient('');

  const [loading, setLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [stories, setStories] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [filterCategory, setFilterCategory] = React.useState<string>('new');

  React.useEffect(() => {
    getStories(page);
  }, [page]);

  const getStories = async (page: number) => {
    const limit = 20;
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

  const initRefresh = async () => {
    setStories([]);
    setPage(1);
    setHasMore(true);
    await getStories(page);
  };

  const filterStories: any[] = [
    {label: 'New', value: 'new'},
    {label: 'Top', value: 'top'},
    {label: 'Best', value: 'best'},
  ];

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
            <View style={{gap: w(20)}}>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: w(16),
                }}>
                {filterStories.map((filter, index) => (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={async () => {
                      setFilterCategory(filter.value);

                      // searchParams.categoryId =
                      //   filter.value !== 'all' ? filter.value : '';
                      // searchParams.text = '';
                      // await searchOutfits(searchParams, false);
                    }}
                    style={{
                      paddingHorizontal:
                        filterCategory === filter.value ? w(12) : 0,
                      paddingVertical: w(6),
                      backgroundColor:
                        filterCategory === filter.value
                          ? '#DB2308'
                          : 'transparent',
                      borderRadius: w(16),
                    }}>
                    <AppText
                      style={{
                        color:
                          filterCategory === filter.value ? 'white' : '#999',
                        fontSize: w(12),
                        fontWeight:
                          filterCategory === filter.value ? '600' : '400',
                        lineHeight: w(13),
                      }}>
                      {filter.label}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
          // ListHeaderComponent={() => (
          //   <View>
          //     <AppText
          //       type="header"
          //       style={{
          //         color: colors.grey950,
          //         fontSize: w(20),
          //         lineHeight: w(26),
          //       }}>
          //       Stories
          //     </AppText>
          //   </View>
          // )}
          contentContainerStyle={{
            gap: w(20),
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
