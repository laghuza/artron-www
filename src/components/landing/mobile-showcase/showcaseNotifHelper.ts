import { DynamicNotifData } from './types';
import { PlanItem, TrainingSlot } from './types';

interface NotifHelperParams {
  screenId: number;
  plan: PlanItem;
  slot: TrainingSlot;
  autoRenew: boolean;
  frzDays: number;
}

export function getNotificationData({
  screenId,
  plan,
  slot,
  autoRenew,
  frzDays,
}: NotifHelperParams): Omit<DynamicNotifData, 'i' | 'key'> | null {
  const notifMap: Record<number, Omit<DynamicNotifData, 'i' | 'key'>> = {
    1: {
      tag: 'BOOKING',
      t: 'ჯავშანი დადასტურებულია',
      s: `სამ, 15 სექ · ${slot.time} · დავით თ.`,
      g: '15',
      gs: 'სექ',
      ml: 'BK-2741',
      mr: 'გაუქმება უფასოდ · 2 სთ-მდე',
    },
    2: {
      tag: 'MEMBERSHIP',
      t: 'აბონემენტი გააქტიურდა',
      s: '12 ვიზიტი · 16 ოქტომბრამდე · 150 ₾',
      g: '12',
      gs: 'ვიზიტი',
      ml: 'ART-88924',
      mr: '14-დღიანი გარანტია ჩაირთო',
    },
    3: {
      tag: 'RENEWAL',
      t: 'აბონემენტი განახლდა',
      s: `${plan.v} · ${plan.end}-მდე · ${plan.price}`,
      g: plan.g,
      gs: plan.gs,
      ml: 'RN-50417',
      mr: autoRenew ? 'ავტო-განახლება ჩართულია' : 'Apple Pay',
    },
    5: {
      tag: 'FREEZE',
      t: 'აბონემენტი გაიყინა',
      s: `${frzDays > 1 ? `21–${20 + frzDays}` : '21'} სექ · ${frzDays} დღე · უფასოდ`,
      g: String(frzDays),
      gs: 'დღე',
      ml: 'FRZ-0921',
      mr: `ახალი ვადა · ${16 + frzDays} ოქტომბერი`,
    },
    6: {
      tag: 'GUEST PASS',
      t: 'მოსაწვევი გაიგზავნა',
      s: 'ნინო კ. · 24 საათი · 1 ვიზიტი',
      g: 'ნკ',
      gs: 'სტუმარი',
      ml: 'GP-3107',
      mr: 'შემოსვლისას შეგატყობინებთ',
    },
  };

  return notifMap[screenId] || null;
}
