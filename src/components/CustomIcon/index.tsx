import React from 'react';
import {
  Card,
  Call,
  ArrowSquareDown,
  ArrowCircleDown,
  Profile,
  Truck,
  ArrowLeft2,
  Eye,
  EyeSlash,
  Message,
  Add,
  Home,
  Home2,
  Discover,
  NotificationBing,
  SearchNormal1,
  Calendar,
  Edit,
  ClipboardText,
  Notepad2,
  Box,
  DocumentText,
  DocumentText1,
  Briefcase,
  FavoriteChart,
  SecurityUser,
  Location,
  ArrowRight2,
  Setting2,
  Buildings,
  LogoutCurve,
  Wallet2,
  Clock,
  Heart,
  Profile2User,
  Diamonds,
  ArrowDown2,
  Bank,
  Send2,
  Send,
  Mobile,
  CloudLightning,
  SmartCar,
  Moneys,
  Category2,
  Screenmirroring,
  DocumentCopy,
  InfoCircle,
  MoreCircle,
  Calendar2,
  DocumentDownload,
  ArrowUp,
  ArrowDown,
  Trash,
  CloseCircle,
  ExportSquare,
  ArrowRotateRight,
  Smileys,
  Microphone2,
  AttachCircle,
  EmojiHappy,
  EmojiNormal,
  AttachSquare,
  TickCircle,
  AddCircle,
  TickSquare,
  Check,
  BrifecaseTimer,
  House,
  Star1,
  Messages,
  Messages1,
  Messages2,
  Messages3,
  Sms,
  MessageQuestion,
  MessageText,
  Save2,
  VideoCircle,
  Book,
  Lovely,
  KyberNetwork,
  Wifi,
  MoneyTick,
  ReceiptItem,
  WalletMoney,
  ShoppingCart,
  Shop,
  ProfileCircle,
} from 'iconsax-react-native';

const getIconType = (icon: string) => {
  switch (icon) {
    case 'card':
      return Card;
    case 'call':
      return Call;
    case 'house':
      return House;
    case 'brifecase':
      return BrifecaseTimer;
    case 'add-circle':
      return AddCircle;
    case 'tick-square':
      return TickSquare;
    case 'arrow-square-down':
      return ArrowSquareDown;
    case 'arrow-circle-down':
      return ArrowCircleDown;
    case 'truck':
      return Truck;
    case 'eye':
      return Eye;
    case 'attach-circle':
      return AttachCircle;
    case 'clock':
      return Clock;
    case 'eye-slash':
      return EyeSlash;
    case 'microphone':
      return Microphone2;
    case 'home':
      return Home;
    case 'home-two':
      return Home2;
    case 'smiley':
      return Smileys;
    case 'explore':
      return Discover;
    case 'message':
      return Message;
    case 'account':
      return Profile;
    case 'add':
      return Add;
    case 'arrow-left':
      return ArrowLeft2;
    case 'notification':
      return NotificationBing;
    case 'search':
      return SearchNormal1;
    case 'calender':
      return Calendar;
    case 'calender2':
      return Calendar2;
    case 'edit':
      return Edit;
    case 'clipboardtext':
      return ClipboardText;
    case 'notes':
      return Notepad2;
    case 'box':
      return Box;
    case 'document-text':
      return DocumentText;
    case 'document-text-1':
      return DocumentText1;
    case 'briefcase':
      return Briefcase;
    case 'favorite-chart':
      return FavoriteChart;
    case 'security-user':
      return SecurityUser;
    case 'location':
      return Location;
    case 'arrow-right':
      return ArrowRight2;
    case 'arrow-down':
      return ArrowDown2;
    case 'settings':
      return Setting2;
    case 'buildings':
      return Buildings;
    case 'logout':
      return LogoutCurve;
    case 'wallet':
      return Wallet2;
    case 'heart':
      return Heart;
    case 'profile2users':
      return Profile2User;
    case 'diamonds':
      return Diamonds;
    case 'bank':
      return Bank;
    case 'send':
      return Send2;
    case 'send-1':
      return Send;
    case 'mobile':
      return Mobile;
    case 'cloud-lightning':
      return CloudLightning;
    case 'smart-car':
      return SmartCar;
    case 'betting':
      return Moneys;
    case 'category':
      return Category2;
    case 'screen':
      return Screenmirroring;
    case 'copy':
      return DocumentCopy;
    case 'info':
      return InfoCircle;
    case 'more-circle':
      return MoreCircle;
    case 'document-download':
      return DocumentDownload;
    case 'arrow-up':
      return ArrowUp;
    case 'transaction-arrow-down':
      return ArrowDown;
    case 'delete':
      return Trash;
    case 'close-circle':
      return CloseCircle;
    case 'export':
      return ExportSquare;
    case 'rotate-right':
      return ArrowRotateRight;
    case 'emoji-happy':
      return EmojiHappy;
    case 'emoji-normal':
      return EmojiNormal;
    case 'microphone':
      return Microphone2;
    case 'attach-file':
      return AttachSquare;
    case 'tick-circle':
      return TickCircle;
    case 'check':
      return Check;
    case 'star':
      return Star1;
    case 'messages-one':
      return Messages1;
    case 'sms':
      return Sms;
    case 'message-question':
      return MessageQuestion;
    case 'message-text':
      return MessageText;
    case 'save-two':
      return Save2;
    case 'video-circle':
      return VideoCircle;
    case 'book':
      return Book;
    case 'lovely':
      return Lovely;
    case 'wifi':
      return Wifi;
    case 'money-tick':
      return MoneyTick;
    case 'receipt-item':
      return ReceiptItem;
    case 'wallet-money':
      return WalletMoney;
    case 'shopping-cart':
      return ShoppingCart;
    case 'shop':
      return Shop;
    case 'profile-cicle':
      return ProfileCircle;
    default:
      return null;
  }
};

interface CustomIconProps {
  icon: string;
  type: 'iconsax' | 'native' | string;
  name?: any;
}

const CustomIcon: any = ({icon, name, type, ...props}: CustomIconProps) => {
  const IconSax: any = getIconType(icon);
  if (type === 'iconsax') {
    return <IconSax {...props} />;
  } else if (type === 'native') {
    // return <Ionicons name={name} {...props} />;
  }
};

export default CustomIcon;
